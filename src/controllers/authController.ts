import { Request, Response } from "express";
import { AppResponse } from "../utils";
import Http from "../constants/statusCodes";
import User from "../models/User";
import { ValidationError } from "joi";
import { lookUpMailSchema } from "../validation";

/**
 * @desc This allows the client find out if the email address
 * provided is not associated with another user
 */
const lookUpMail = async (req: Request, res: Response) => {
  try {
    const { email } = await lookUpMailSchema.validateAsync(req.body);
    const user = await User.findOne({ emailAddress: email });

    if (user) {
      return AppResponse(
        res,
        Http.BAD_REQUEST,
        null,
        "Email address is associated with another user",
        false,
      );
    }
    return AppResponse(
      res,
      Http.OK,
      null,
      "Email address is not associated with another user",
      true,
    );
  } catch (err: any) {
    console.error("LookUpMailError:", err);
    if (err instanceof ValidationError) {
      return AppResponse(
        res,
        Http.UNPROCESSABLE_ENTITY,
        null,
        err.details[0].message,
        false,
      );
    }
    return AppResponse(
      res,
      Http.INTERNAL_SERVER_ERROR,
      null,
      "An internal server error occurred",
      false,
    );
  }
};

export { lookUpMail };
