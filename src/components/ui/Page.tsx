import { SDSColoursSemantic } from './Colours';

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

export default function Page({ children }: Props) {
    return (
        <div
            style={{
                paddingTop: '50px',
                paddingLeft: '146px',
                paddingRight: '146px',
                backgroundColor: SDSColoursSemantic.background,
            }}
        >
            {children}
        </div>
    );
}
