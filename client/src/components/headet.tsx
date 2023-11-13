import { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpen = e => {
        setAnchorEl(e.target);
    };

    const logout = () => {
        localStorage.clear();
        setAnchorEl(null);
        navigate('/sign-in');
    };

    return (
        <header className="header">
            <Avatar alt="Remy Sharp" onClick={handleOpen} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </header>
    );
};

export default Header;
