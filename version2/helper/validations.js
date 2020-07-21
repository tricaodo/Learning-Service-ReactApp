
export const isValidImage = image => {
    console.log(image);
    if(!image) return false;
    const extensions = ["png", "jpeg", "jpg", "svg"];
    const extension = image.split(".").pop();
    return extensions.includes(extension);
}

export const isSame = (getValues, field) => value => {
    return value === getValues()[field];
}