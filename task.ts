import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const task: Task = req.body;
    if (!task) {
      return res.status(400).json({ data: "No task found." });
    }

    try {
      const { email }: AuthGuardResponse = await authGuard(req);
      const createTask = await PrismaClient.task.create({
        data: {
          ...task,
          user: {
            connect: { email },
          },
        },
      });
      res.json(createTask);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  } else if (req.method === "PATCH") {
    const taskOnReq: Task = req.body;
    if (!taskOnReq) {
      return res.status(400).json({ data: "No task found." });
    }

    try {
      await authGuard(req);
      let task: Task | null = await PrismaClient.task.findUnique({
        where: {
          id: req.body.id,
        },
      });

      if (!task) {
        return res.status(400).json({ data: "No task found." });
      }

      task = await PrismaClient.task.update({
        where: {
          id: req.body.id,
        },
        data: taskOnReq,
      });
      res.json(task);
    } catch (e) {
      res.status(400).send(e);
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedTask = await PrismaClient.task.delete({
        where: {
          id: req.body.id,
        },
      });
      if (deletedTask) {
        res.status(200).send(deletedTask);
      } else {
        throw Error("Failed to delete task.");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }
}
