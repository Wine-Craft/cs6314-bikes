export default function hexCode(code) {
    const reg=/^#([0-9a-f]{3}){1,2}$/i;
    if(reg.test(code)) {
        return true;
    }
    throw new Error('Invalid RGB hexcode');
}