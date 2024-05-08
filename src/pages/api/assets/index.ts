// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fileUpload } from "@/utils/fileUpload";
import { Request, Response } from "express";

export const config = {
  api: { bodyParser: false },
};
export default function handler(req: Request, res: Response) {
  try {
    fileUpload(req, res, (error) => {
      if (error) return res.status(500).send("Not Allowed Image");
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.status(200).json({ assetUrl });
    });
  } catch (error) {
    return res.status(404).send("Server Error");
  }
}
