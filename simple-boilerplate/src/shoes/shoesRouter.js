import express from "express";
import { shoesList } from "./shoesList";

const ShoesRouter = express.Router();

ShoesRouter.route("/")
    .get(async (req, res) => {
        // const { limit = 20, skip = 0, sort = "_id", ...filter } = req.query;
        res.set("X-Total-Count", shoesList.length);
        return res.json(shoesList);
    })
    .post(async (req, res) => {
        return res.status(201).json(req.body);
    });

ShoesRouter.route("/:id")
    .get(async (req, res) => {
        const shoe = shoesList.find((s) => s.id.toString() === req.params.id.toString());
        return res.json(shoe);
    })
    .patch(async (req, res) => {
        const shoe = shoesList.find((s) => s.id.toString() === req.params.id.toString());
        return res.json({
            ...shoe,
            ...req.body
        });
    })
    .put(async (req, res) => {
        const shoe = shoesList.find((s) => s.id.toString() === req.params.id.toString());
        return res.json({
            id: shoe.id,
            ...req.body
        });
    })
    .delete(async (_, res) => {
        return res.sendStatus(204);
    });


export { ShoesRouter };
