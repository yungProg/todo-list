export default function todo (props) {
    const task = {
        id: crypto.randomUUID(),
        status: false,
        ...props
    };
    
    return task
}