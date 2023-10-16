import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Card,
    CardContent,
    Divider,
    Typography,
    useMediaQuery,
} from '@mui/material';
import {
    Build as BuildIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';
import AuthService from '../services/Auth.service';
import { User } from '../interfaces/User.interface';

const AppHeader = () => {
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    
    const user: User = AuthService.getUser()


    const handleUserMenuOpen = (event: any) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {isSmallScreen ? (
                    <>
                        <div>
                            <IconButton onClick={handleUserMenuOpen}>
                                <Avatar alt="Usuario" src="URL_DE_LA_IMAGEN_DEL_USUARIO" />
                            </IconButton>
                            <Menu
                                anchorEl={userMenuAnchor}
                                open={Boolean(userMenuAnchor)}
                                onClose={handleUserMenuClose}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {user.name + ' ' + user.last_name}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                           {user.email}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
                                        Cerrar Sesión
                                    </MenuItem>
                                </Card>
                            </Menu>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <IconButton style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                <BuildIcon fontSize="medium" />
                            </IconButton>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    
                            <BuildIcon fontSize="medium" style={{ marginRight: 8 }} />
                    
                        <Typography variant="h6" style={{ marginRight: 'auto' }}>
                            Portal de Aplicaciones Empresariales
                        </Typography>
                        <div>
                            <IconButton onClick={handleUserMenuOpen}>
                                <Avatar alt="Usuario" src="URL_DE_LA_IMAGEN_DEL_USUARIO" />
                            </IconButton>
                            <Menu
                                anchorEl={userMenuAnchor}
                                open={Boolean(userMenuAnchor)}
                                onClose={handleUserMenuClose}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {user.name + ' ' + user.last_name}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                             {user.email}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
                                        Cerrar Sesión
                                    </MenuItem>
                                </Card>
                            </Menu>
                        </div>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
