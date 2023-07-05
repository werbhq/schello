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
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 300, height: 40 }}
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
