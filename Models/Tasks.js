/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
exports.lastId = tasks => {
    let id = -1;
    tasks.forEach(t => {
        // eslint-disable-next-line prefer-destructuring
        if (t.id > id) id = t.id;
    });

    return id;
};

exports.validate = (title) => {
    const errors = {
        title: [],
        errors: function () {
            return (this.title.length > 0);
        }
    }

    if (!title || title.trim().length === 0 || title.trim().length < 6)
        errors.title.push('Por favor, informe o titulo! O campo deve ter ao menos 6 caracteres');

    return errors;
}