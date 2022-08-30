import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const project: Project = req.body;
    if (!project) {
      return res.status(400).json({ data: "No project found." });
    }

    try {
      const { email }: AuthGuardResponse = await authGuard(req);
      const createProject = await PrismaClient.project.create({
        data: {
          ...project,
          user: {
            connect: { email },
          },
        },
      });
      res.json(createProject);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  } else if (req.method === "PATCH") {
    const projectOnReq: Project = req.body;
    if (!projectOnReq) {
      return res.status(400).json({ data: "No project found." });
    }

    try {
      await authGuard(req);
      let project: Project | null = await PrismaClient.project.findUnique({
        where: {
          id: req.body.id,
        },
      });

      if (!project) {
        return res.status(400).json({ data: "No project found." });
      }

      project = await PrismaClient.project.update({
        where: {
          id: req.body.id,
        },
        data: projectOnReq,
      });
      res.json(project);
    } catch (e) {
      res.status(400).send(e);
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedProject = await PrismaClient.project.delete({
        where: {
          id: req.body.id,
        },
      });
      if (deletedProject) {
        res.status(200).send(deletedProject);
      } else {
        throw Error("Failed to delete project.");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }
}
