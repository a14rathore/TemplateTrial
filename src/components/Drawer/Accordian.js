import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: "100%",
  background: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  height: 0,
  padding: "0px 16px 0px 0px",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "none",

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions({ item, index }) {
  const Navigate = useNavigate();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const OnSideButtonClick = (Text) => {
    switch (Text) {
      case "Home":
        return Navigate("/");
      case "Add":
        return Navigate("/registration");
      case "Search":
        return Navigate("/searchform");
      case "List":
        return Navigate("/list");
      case "My Task":
        return console.log("My Task");
      case "Alerts":
        return console.log("Alerts");
      case "QR":
        return console.log("QR");
      case "Profile":
        return Navigate("/profile");

      default:
        return console.log(Text);
    }
  };

  return (
    <Accordion
      expanded={expanded === `panel-${index}`}
      onChange={handleChange(`panel-${index}`)}
    >
      <AccordionSummary
        aria-controls={`panel-${index}d-content`}
        id={`panel-${index}d-header`}
      >
        <ListItemButton
          disableRipple
          onClick={() => OnSideButtonClick(item.text)}
        >
          <ListItemIcon>
            {
              <img
                src={item.src}
                alt="icn"
                width={"30px"}
                height={"30px"}
                style={{
                  backgroundColor: "#ffffff",
                  padding: 5,
                  borderRadius: 8,
                }}
              />
            }
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            sx={{ marginLeft: "8px", color: "#ffffff" }}
            primaryTypographyProps={{ fontSize: 20 }}
          />
        </ListItemButton>
      </AccordionSummary>
      <AccordionDetails>
        {item.subtitle?.map((ele, i) => (
          <div>
            <Button
              key={i}
              variant="text"
              sx={{ color: "#FFF" }}
              onClick={() => {
                ele?.onClick();
              }}
            >
              {ele.title}
            </Button>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
