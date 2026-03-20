import { Typography, Card, CardContent } from '@mui/material';
import React from "react";

function InfoBox({title,cases,total}) {
  return (
    <Card className="infoBox">
        <CardContent>
            {/* title i.e corona virus cases */}
            <Typography className = "infoBox__title" color = "textSecondary">
                {title}
            </Typography>

            {/* +120K Number of case  */}
            <h2 className="infoBox__cases">{cases}</h2>

            {/* 1.2M total  */}
            <Typography className = "infoBox__total">
                {total} Total
            </Typography>
        </CardContent>

    </Card>
  ) 
}

export default InfoBox;
