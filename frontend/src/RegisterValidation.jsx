function Validation(values) {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const name_pattern = /^[a-zA-Z\s]+$/;

    if (values.name === "") {
        errors.name = "Name is required";
    } else if (!name_pattern.test(values.name)) {
        errors.name = "This is not a valid name format";
    } else {
        errors.name = "";
    }

    if (values.email === "") {
        errors.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "This is not a valid email format";
    } else {
        errors.email = "";
    }

    if (values.password === "") {
        errors.password = "Password is required";
    }
    else if (!password_pattern.test(values.password)) {
        errors.password = "Password should be 6-16 characters and include at least one special character and one number";
    } else {
        errors.password = "";
    }
    return errors;
}

export default Validation;