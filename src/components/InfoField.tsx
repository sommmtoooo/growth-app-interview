interface Props {
    message: string,
    type?: 'info' | 'error' | 'warning'
}
export default function InfoField({ message, type = 'warning' }: Props) {
    const style = 'py-3 text-md' + type === 'error' ? 'text-red-700' : type === 'info' ? 'text-neutral-700' : 'text-emerald-500'
    return <span className={style}>{message}</span>
}