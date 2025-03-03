import Joi from 'joi';

const validateRegistration = (data) =>  {
    const schema = Joi.object({
        fullname: Joi.string().min(6).required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const validateLogin = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const validateCreateTask = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(4).required(),
        description: Joi.string().min(6).required(),
        dueDate: Joi.date().required(),
    });
    return schema.validate(data);
};

const validateUpdateTask = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(4),
        description: Joi.string().min(6),
        dueDate: Joi.date(),
    }).or('title', 'description', 'dueDate'); // At least one field must be updated

    return schema.validate(data);
};

const validateUpdateTaskStatus = (data) => {
    const schema = Joi.object({
        status: Joi.string().valid('To-do', 'In Progress', 'Testing', 'Done').required(),
    });
    return schema.validate(data);
};


export { validateRegistration, validateLogin, validateCreateTask,validateUpdateTask,validateUpdateTaskStatus};