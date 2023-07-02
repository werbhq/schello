import { SDSColoursSemantic } from './Colours';

type Props = {
    children: string | JSX.Element | JSX.Element[];
    padding?: string | undefined;
};

export default function Page({ children, padding }: Props) {
    return (
        <div
            style={{
                padding: padding ?? '50px 146px 0px 146px',
                backgroundColor: SDSColoursSemantic.background,
                minHeight: '100vh',
            }}
        >
            {children}
        </div>
    );
}
