type Props = {
    children: string | JSX.Element | JSX.Element[];
};

export default function Page({ children }: Props) {
    return (
        <div style={{ paddingTop: '50px', paddingLeft: '196px', paddingRight: '196px' }}>
            {children}
        </div>
    );
}
