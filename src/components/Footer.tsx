import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Divider, Hidden } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { LocationOn, Phone } from '@mui/icons-material';
import {
    Build as BuildIcon
} from '@mui/icons-material';

export default function Footer() {
    return (
        <footer className="footer">
            <Hidden lgUp>
                <Divider style={{ marginBottom: '2rem' }}></Divider>
            </Hidden>
            <Container>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <IconButton>
                        <BuildIcon fontSize="medium" />
                    </IconButton>
                    <Typography variant="h6" >
                        Ferreteria la Bendición
                    </Typography>

                </Box>
                <div className="links">
                    <Box mb={1}></Box>
                    <div>
                        <Typography variant="h6">Contacto</Typography>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="column-flex">
                            <IconButton href="#" color="inherit">
                                <LocationOn />
                            </IconButton>
                            <Typography variant="h6">Ciudad de Guatemala, Guatemala</Typography>
                            <IconButton href="#" color="inherit">
                                <Phone />
                            </IconButton>
                            <Typography variant="h6">+502 1777-0000</Typography>
                            <IconButton href="#" color="inherit">
                                <EmailIcon />
                            </IconButton>
                            <Typography variant="h6">soporte@ferreteria.com.gt</Typography>
                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <Typography className="copyright">&copy; Copyright - Ferretería la Bendición</Typography>
            </Container>
        </footer>
    );
};
