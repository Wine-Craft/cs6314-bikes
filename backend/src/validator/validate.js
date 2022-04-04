import { validationResult } from 'express-validator';

export default function validate(req, res, next) {
    let errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    return next();
}