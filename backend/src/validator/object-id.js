export default function isObjectID(test) {
    if(test.match(/^[0-9a-fA-F]{24}$/)) {
        return true;
    }
    throw new Error("Invalid ObjectID");
}