import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useState } from 'react';
import InteractiveEnvelope from './Envelope';

const BowClip = ({ style }) => (
  <>
    <style>{`
      @keyframes bowClipFloat {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
        100% { transform: translateY(0px); }
      }
    `}</style>
    <div
      style={{
        position: 'absolute',
        opacity: 0.72,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          animation: 'bowClipFloat 3.8s ease-in-out infinite',
          transformOrigin: 'center',
        }}
      >
        <svg
          width="28"
          height="20"
          viewBox="0 0 28 20"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <path d="M0 10 L10 2 L14 10 L10 18 Z" fill="#c9a84c" />
          <path d="M28 10 L18 2 L14 10 L18 18 Z" fill="#c9a84c" />
          <ellipse cx="14" cy="10" rx="3" ry="3" fill="#e0c060" />
          <ellipse cx="14" cy="10" rx="1.5" ry="1.5" fill="#c9a84c" />
        </svg>
      </div>
    </div>
  </>
);

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: '#fafaf8',
    padding: theme.spacing(8, 5),
    position: 'relative',
    minHeight: 500,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 3),
    },
  },
  iPadContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 380,
  },
  iPad: {
    width: 260,
    height: 355,
    backgroundColor: '#1c1c1e',
    borderRadius: 28,
    padding: 10,
    position: 'relative',
    boxShadow: '0 22px 60px rgba(0,0,0,0.28)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'scale(1.03) translateY(-4px)',
      boxShadow: '0 32px 70px rgba(0,0,0,0.36)',
    },
  },
  iPadNotch: {
    position: 'absolute',
    top: 6,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 46,
    height: 4,
    backgroundColor: '#3a3a3c',
    borderRadius: 2,
    zIndex: 1,
  },
  iPadScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccd8d0',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  envelopeArea: {
    width: '70%',
    position: 'relative',
  },
  envelopeBody: {
    width: '100%',
    paddingBottom: '68%',
    backgroundColor: '#7e9e8c',
    borderRadius: 3,
    position: 'relative',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
  },
  envelopeFlap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(168deg, #6a8878 0%, #7e9e8c 100%)',
    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
    zIndex: 1,
  },
  envelopeSeal: {
    position: 'absolute',
    top: 8,
    left: 9,
    width: 18,
    height: 18,
    borderRadius: '50%',
    border: '1.5px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(50,60,55,0.4)',
    zIndex: 2,
  },
  envelopeStamp: {
    position: 'absolute',
    top: 7,
    right: 9,
    width: 18,
    height: 22,
    border: '1.5px dashed rgba(255,255,255,0.32)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    zIndex: 2,
  },
  envelopeScript: {
    position: 'absolute',
    top: '62%',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'rgba(255,255,255,0.48)',
    fontFamily: 'cursive, serif',
    fontSize: '0.56rem',
    whiteSpace: 'nowrap',
    zIndex: 2,
    userSelect: 'none',
  },
  heroRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingTop: theme.spacing(4),
    },
  },
  heroHeading: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '2.3rem',
    fontWeight: 300,
    lineHeight: 1.26,
    color: '#2c2c2c',
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },
  heroSub: {
    fontSize: '0.7rem',
    letterSpacing: '0.13em',
    color: '#b0b0b0',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(3),
  },
  emailRow: {
    display: 'flex',
    maxWidth: 400,
    border: '1px solid #d8d8d8',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  emailInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '12px 16px',
    fontSize: '0.87rem',
    color: '#444',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    minWidth: 0,
    '&::placeholder': {
      color: '#c8c8c8',
    },
  },
  letsGoBtn: {
    backgroundColor: '#5aad5e',
    color: '#fff',
    border: 'none',
    padding: '12px 22px',
    fontSize: '0.8rem',
    letterSpacing: '0.07em',
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    transition: 'background-color 0.15s',
    '&:hover': {
      backgroundColor: '#47a04c',
    },
  },
  noCreditCard: {
    fontSize: '0.7rem',
    color: '#c0c0c0',
    fontStyle: 'italic',
    marginTop: theme.spacing(1),
  },
  // ── Dialog ──────────────────────────────────────────
  dialogPaper: {
    maxWidth: 860,
    width: '92vw',
    overflow: 'hidden',
    borderRadius: 4,
    margin: theme.spacing(2),
  },
  dialogHeader: {
    backgroundColor: '#2a2a2a',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogHeaderText: {
    fontFamily: 'Georgia, serif',
    fontSize: '0.88rem',
    color: '#e0e0e0',
    letterSpacing: '0.04em',
  },
  rsvpBanner: {
    backgroundColor: '#f5e7c8',
    padding: '9px 20px',
    display: 'flex',
    alignItems: 'center',
  },
  rsvpBannerText: {
    fontSize: '0.82rem',
    color: '#555',
  },
  rsvpNow: {
    color: '#5b8c7e',
    fontWeight: 700,
    fontSize: '0.82rem',
    marginLeft: 8,
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' },
  },
  dialogBody: {
    display: 'flex',
    overflow: 'hidden',
    height: 476,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 'auto',
      maxHeight: 'calc(80vh - 90px)',
      overflowY: 'auto',
    },
  },
  // ── Invitation preview (left panel) ─────────────────
  previewPanel: {
    flex: '0 0 55%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#e4ddd6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 320,
    },
  },
  blob1: {
    position: 'absolute',
    right: '-10%',
    top: '5%',
    width: '58%',
    height: '68%',
    backgroundColor: '#3d6474',
    borderRadius: '60% 40% 50% 50% / 55% 45% 55% 45%',
    opacity: 0.9,
  },
  blob2: {
    position: 'absolute',
    left: '-2%',
    top: '24%',
    width: '55%',
    height: '44%',
    backgroundColor: '#cc7060',
    borderRadius: '45% 55% 48% 52% / 52% 48% 52% 48%',
    opacity: 0.85,
  },
  blob3: {
    position: 'absolute',
    left: '-4%',
    top: '-8%',
    width: '48%',
    height: '44%',
    backgroundColor: '#9bbaaa',
    borderRadius: '52% 48% 44% 56% / 56% 44% 56% 44%',
    opacity: 0.78,
  },
  blob4: {
    position: 'absolute',
    right: '4%',
    bottom: '-8%',
    width: '42%',
    height: '40%',
    backgroundColor: '#8898aa',
    borderRadius: '55% 45% 55% 45% / 48% 52% 48% 52%',
    opacity: 0.65,
  },
  whiteCard: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: '#fff',
    padding: theme.spacing(2.5, 2),
    textAlign: 'center',
    width: '46%',
    boxShadow: '0 6px 28px rgba(0,0,0,0.15)',
  },
  cardJoinUs: {
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: '0.7rem',
    color: '#777',
    marginBottom: 3,
  },
  cardMainTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '1.85rem',
    fontWeight: 400,
    color: '#1a1a1a',
    lineHeight: 1,
    marginBottom: 2,
  },
  cardSubTitle: {
    fontSize: '0.56rem',
    letterSpacing: '0.24em',
    color: '#666',
    marginBottom: 10,
  },
  cardHr: {
    border: 'none',
    borderTop: '1px solid #ebebeb',
    margin: '7px 0',
  },
  cardDate: {
    fontFamily: 'Georgia, serif',
    fontSize: '1.8rem',
    fontWeight: 400,
    color: '#1a1a1a',
    margin: '5px 0 2px',
  },
  cardTime: {
    fontSize: '0.7rem',
    color: '#666',
    marginBottom: 8,
  },
  cardVenue: {
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: '0.85rem',
    color: '#2c2c2c',
    marginBottom: 3,
  },
  cardAddr: {
    fontSize: '0.52rem',
    letterSpacing: '0.14em',
    color: '#aaa',
    textTransform: 'uppercase',
    lineHeight: 1.7,
  },
  previewIconRow: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    display: 'flex',
    gap: 6,
    zIndex: 3,
  },
  previewIconBtn: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.42)',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: 0,
    '& svg': { fontSize: '0.95rem' },
    '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
  },
  poweredBy: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: '0.5rem',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.36)',
    padding: '2px 8px',
    borderRadius: 2,
    letterSpacing: '0.07em',
    zIndex: 3,
    textTransform: 'uppercase',
  },
  // ── Details panel (right panel) ──────────────────────
  detailsPanel: {
    flex: '0 0 45%',
    overflowY: 'auto',
    padding: theme.spacing(2.5, 3),
    backgroundColor: '#fff',
    borderLeft: '1px solid #eee',
    [theme.breakpoints.down('sm')]: {
      flex: 'none',
    },
  },
  detailsHeading: {
    textAlign: 'center',
    letterSpacing: '0.2em',
    fontSize: '0.7rem',
    color: '#c0c0c0',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
  },
  sectionDivider: {
    margin: theme.spacing(1.5, 0),
  },
  sectionLabel: {
    textAlign: 'center',
    letterSpacing: '0.15em',
    fontSize: '0.64rem',
    color: '#c0c0c0',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
  },
  summaryText: {
    fontSize: '0.78rem',
    color: '#666',
    lineHeight: 1.65,
    textAlign: 'center',
  },
  locationEventName: {
    fontWeight: 700,
    fontSize: '0.82rem',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  locationDetail: {
    fontSize: '0.74rem',
    color: '#888',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  linkRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: theme.spacing(1.5),
  },
  detailLink: {
    color: '#5b8c7e',
    fontSize: '0.72rem',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
    '& svg': { fontSize: '0.85rem' },
  },
  attendTitle: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '0.82rem',
    color: '#444',
    marginBottom: theme.spacing(1),
  },
  virtualBtn: {
    width: '100%',
    backgroundColor: '#5b8c7e',
    color: '#fff',
    padding: '8px 0',
    fontSize: '0.8rem',
    borderRadius: 4,
    letterSpacing: '0.03em',
    marginBottom: theme.spacing(0.5),
    '&:hover': { backgroundColor: '#4d7a6d' },
  },
  copyRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    fontSize: '0.7rem',
    color: '#aaa',
    cursor: 'pointer',
    marginBottom: theme.spacing(0.5),
    '& svg': { fontSize: '0.75rem' },
    '&:hover': { color: '#888' },
  },
  virtualTime: {
    fontSize: '0.68rem',
    color: '#bbb',
    textAlign: 'center',
    marginBottom: theme.spacing(0.5),
  },
  virtualNote: {
    fontSize: '0.71rem',
    color: '#999',
    textAlign: 'center',
    lineHeight: 1.55,
    marginBottom: theme.spacing(1),
  },
  calendarLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    color: '#5b8c7e',
    fontSize: '0.7rem',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
    '& svg': { fontSize: '0.8rem' },
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#5b8c7e',
    color: '#fff',
    padding: '12px 0',
    letterSpacing: '0.12em',
    fontSize: '0.78rem',
    fontWeight: 600,
    borderRadius: 4,
    marginTop: theme.spacing(2.5),
    textTransform: 'uppercase',
    '&:hover': { backgroundColor: '#4d7a6d' },
  },
}));

export default function AuthInvitation() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* ── Hero Section ── */}
      <Box className={classes.hero}>
        <BowClip style={{ top: 50, left: '41%', transform: 'rotate(-8deg)' }} />
        <BowClip style={{ top: 54, left: 'calc(41% + 52px)', transform: 'rotate(5deg)' }} />
        <BowClip style={{ bottom: 75, right: 110, transform: 'rotate(12deg)' }} />
        <BowClip style={{ bottom: 60, left: 70, transform: 'rotate(-5deg)' }} />
        <BowClip style={{ top: 90, right: 55, transform: 'rotate(20deg)' }} />
        <BowClip style={{ bottom: 120, right: 200, transform: 'rotate(-15deg)' }} />

        <Grid container alignItems="center">
          {/* iPad mockup — click to open invitation preview */}
          {/* <Grid item xs={12} md={5} className={classes.iPadContainer}>
            <Box
              className={classes.iPad}
              onClick={() => setDialogOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Preview invitation sample"
              onKeyDown={(e) => { if (e.key === 'Enter') setDialogOpen(true); }}
            >
              <Box className={classes.iPadNotch} />
              <Box className={classes.iPadScreen}>
                <Box className={classes.envelopeArea}>
                  <Box className={classes.envelopeBody}>
                    <Box className={classes.envelopeFlap} />
                    <Box className={classes.envelopeSeal} />
                    <Box className={classes.envelopeStamp} />
                    <Typography className={classes.envelopeScript}>
                      You are Invited
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <img 
                src={teaser2} 
                alt="Teaser 2 invitation preview" 
                width={100} 
                height={100}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} 
                />
            </Box>
          </Grid> */}

          {/* Hero text */}
          <Grid item xs={12} md={7} className={classes.heroRight}>
            {/* <Typography className={classes.heroHeading}>
              Make &amp; Send Your Online Invitation In Minutes. Easy,{' '}
              Real-Time RSVP Tracking.
            </Typography> */}
            <Typography className={classes.heroHeading}>
              Blah Blah Blah BlahBlah Blah Blah Blah Blah Blah Blah BlahBlah Blah October 16 2026

            </Typography>
            <Typography className={classes.heroSub}>
              ✨ Prepare for the Most Glamorous Night of the Year ✨
            </Typography>
            {/* <Box className={classes.emailRow}>
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.emailInput}
                aria-label="Email address"
              />
              <button className={classes.letsGoBtn}>LET'S GO!</button>
            </Box> */}
            {/* <Typography className={classes.noCreditCard}>
              No credit card required
            </Typography> */}
          </Grid>

          <Grid item xs={12} md={5}>
            <InteractiveEnvelope />
          </Grid>
          {/* <Grid item xs={12}>
            <InteractiveEnvelope2 />
          </Grid> */}
        </Grid>
      </Box>

      {/* ── Invitation Sample Dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{ className: classes.dialogPaper }}
        maxWidth={'lg'}
        // fullScreen={true}
      >
        {/* Header bar */}
        <Box className={classes.dialogHeader}>
          <Typography className={classes.dialogHeaderText}>
            Colcap @ 20 - ✨ Prepare for the Most Glamorous Night of the Year ✨
          </Typography>
          <IconButton
            size="small"
            onClick={() => setDialogOpen(false)}
            style={{ color: '#e0e0e0', padding: 4 }}
            aria-label="Close dialog"
          >
            <CloseIcon style={{ fontSize: '1.05rem' }} />
          </IconButton>
        </Box>

        {/* RSVP banner */}
        <Box className={classes.rsvpBanner}>
          <Typography className={classes.rsvpBannerText}>
            Please RSVP for this Event
          </Typography>
          <span className={classes.rsvpNow}>RSVP NOW</span>
        </Box>

        {/* Body: preview (left) + details (right) */}
        <Box className={classes.dialogBody}>

          {/* Invitation card preview */}
          <Box className={classes.previewPanel}>
            {/* <Box className={classes.blob1} />
            <Box className={classes.blob2} />
            <Box className={classes.blob3} />
            <Box className={classes.blob4} /> */}

            <Box className={classes.whiteCard}>
              <Typography className={classes.cardJoinUs}>please join us for</Typography>
              <Typography className={classes.cardMainTitle}>cocktails</Typography>
              <Typography className={classes.cardSubTitle}>+ Conversation</Typography>
              <hr className={classes.cardHr} />
              <Typography className={classes.cardDate}>10.16</Typography>
              <Typography className={classes.cardTime}>5:00-8:00pm</Typography>
              <Typography className={classes.cardVenue}>Six Doors Buffet</Typography>
              <Typography className={classes.cardAddr}>
                2nd floor, Uptown Mall, 36th St, Uptown Bonifacio, Taguig, Metro Manila
              </Typography>
            </Box>

            {/* <Box className={classes.previewIconRow}>
              <button className={classes.previewIconBtn} aria-label="Zoom in">
                <ZoomInIcon />
              </button>
              <button className={classes.previewIconBtn} aria-label="Expand view">
                <CropFreeIcon />
              </button>
            </Box>

            <Typography className={classes.poweredBy}>
              Powered by Greenvelope
            </Typography> */}
          </Box>

          {/* Event details */}
          <Box className={classes.detailsPanel}>
            <Typography className={classes.detailsHeading}>Details</Typography>
            <Divider className={classes.sectionDivider} />

            <Typography className={classes.sectionLabel}>Summary</Typography>
            <Typography className={classes.summaryText}>
              Join us for cocktails and conversations with drinks, good company, and live music.
            </Typography>
            <Typography className={classes.summaryText} style={{ marginTop: 8 }}>
              Live musical entertainment will be provided by La Tigre and The Burnam Sisters.
              With hosted appetizers and a full hosted bar, you can leave the wallets at home.
            </Typography>

            <Divider className={classes.sectionDivider} />

            <Typography className={classes.sectionLabel}>Locations</Typography>
            <Typography className={classes.locationEventName}>
              Cocktails + Conversation
            </Typography>
            <Typography className={classes.locationDetail}>
              Six Doors Buffet<br />
              2nd floor, Uptown Mall, 36th St, Uptown Bonifacio, Taguig, Metro Manila<br />
              5:00 PM – 8:00 PM Friday, October 16, 2026
            </Typography>
            <Box className={classes.linkRow}>
              <a className={classes.detailLink} role="button" tabIndex={0}>
                <LocationOnIcon />View Map
              </a>
              <a className={classes.detailLink} role="button" tabIndex={0}>
                <CalendarTodayIcon />Add to calendar
              </a>
            </Box>

            <Divider className={classes.sectionDivider} />

            <Typography className={classes.attendTitle}>Attend Virtually</Typography>
            <Button
              className={classes.virtualBtn}
              variant="contained"
              disableElevation
            >
              Virtual Event Link
            </Button>
            <Box className={classes.copyRow}>
              <LinkIcon />
              <span>Copy Link to Event</span>
            </Box>
            <Typography className={classes.virtualTime}>
              5:00 PM (PST) Tuesday, November 18, 2025
            </Typography>
            <Typography className={classes.virtualNote}>
              We will also be offering a virtual event option for those who cannot attend
              in-person. The link will go live 1 hour prior to event start time.
            </Typography>
            <a className={classes.calendarLink} role="button" tabIndex={0}>
              <CalendarTodayIcon />Add to calendar
            </a>

            <Button
              className={classes.submitBtn}
              variant="contained"
              disableElevation
            >
              Submit Your RSVP
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
