import { IconButton, InputBase, Paper } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';

export default function SearchBar({
    placeholder,
    onChange,
}: {
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}) {
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                // maxWidth: 300,
                height: 40,
                // width: '100%',
                flexGrow: 1,
                borderRadius: '12px',
                boxShadow: 'inset 0px 4px 50px 0px rgba(64, 93, 136, 0.08)',
                border: '1px solid rgba(199, 173, 165, 0.50)',
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': placeholder }}
                onChange={onChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <GridSearchIcon />
            </IconButton>
        </Paper>
    );
}
