import { Chip } from '@mui/material';

interface SDSChipProps {
    label: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
    size?: 'small' | 'medium' | undefined;
    variant?: 'filled' | 'outlined' | undefined;
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
}

export const SDSChip = (props: SDSChipProps) => {
    const { label, color, size, variant, icon } = props;
    return (
        <Chip
            label={label}
            color={color}
            size={size}
            variant={variant}
            icon={icon}
            sx={{ borderRadius: 6, border: '1px #00000010 solid' }}
        />
    );
};
