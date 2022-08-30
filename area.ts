import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const area: Area = req.body;
    if (!area) {
      return res.status(400).json({ data: "No area found." });
    }

    try {
      const { email }: AuthGuardResponse = await authGuard(req);
      const createArea = await PrismaClient.area.create({
        data: {
          ...area,
          user: {
            connect: { email },
          },
        },
      });
      res.json(createArea);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  } else if (req.method === "PATCH") {
    const areaOnReq: Area = req.body;
    if (!areaOnReq) {
      return res.status(400).json({ data: "No area found." });
    }

    try {
      await authGuard(req);
      let area: Area | null = await PrismaClient.area.findUnique({
        where: {
          id: req.body.id,
        },
      });

      if (!area) {
        return res.status(400).json({ data: "No area found." });
      }

      area = await PrismaClient.area.update({
        where: {
          id: req.body.id,
        },
        data: areaOnReq,
      });
      res.json(area);
    } catch (e) {
      res.status(400).send(e);
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedArea = await PrismaClient.area.delete({
        where: {
          id: req.body.id,
        },
      });
      if (deletedArea) {
        res.status(200).send(deletedArea);
      } else {
        throw Error("Failed to delete area.");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }
}
