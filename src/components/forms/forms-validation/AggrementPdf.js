import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { pdfFromReact } from 'generate-pdf-from-react-html';

const AggrementPdf = ({ signImg }) => {
  return (
    <>
      <div className="element-to-print">
        {/* <Avatar
              src="assets/images/rhb-logo.png"
              style={{
                width: '50%',
                height: 'auto',
                borderRadius: '0px',
                backgroundColor: 'transparent'
              }}
            /> */}
        <span style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'black' }}>Perjanjian Pelaburan</span>
        <br />
        <br />
        <span>[ Tarikh : 01 februari 2023 ]</span>
        <br />
        <br />
        <span>ANTARA</span>
        <br />
        <br />
        <span>[ Tarikh : 01 februari 2023 ]</span>
        <br />
        <br />
        <span>[</span> <span>INVESTOR</span>
        <span style={{ p: '2em' }}>]</span>
        <br />
        <br />
        <span>DAN</span>
        <br />
        <br />
        <span>OD LEGACY REALTY SDN [BHD SSM NO: 1390527M]</span>
        <br />
        <br />
        <span>[ investee ]</span>
        <br />
        <br />
        <span>PERJANJIAN PELABURAN</span>
        <br />
        <br />
        <span>Perjanjian ini diperbuat pada 01 haribulan Januari 2023</span>
        <br />
        <br />
        <span>ANTARA</span>
        <br />
        <br />
        <span>MUHAIZAN BIN ABU@HUSSIN [NO K/P: 750611-01-5643]</span>
        <br />
        {/* <Typography variant="span" className="titleH3">
            Perjanjian Pelaburan
          </Typography> */}
        {/* <Typography variant="span" className="titleH3">{`[ Tarikh : 01 februari  2023 ]`}</Typography> */}
        {/* <Typography variant="span">ANTARA</Typography>

          <Typography variant="span">{`( INVESTOR ) `}</Typography>

          <Typography variant="span">{`DAN`}</Typography>

          <Typography variant="span">{`OD LEGACY REALTY SDN (BHD SSM NO: 1390527M)`}</Typography>

          <Typography variant="span">{`[ INVESTEE  ]`}</Typography>

          <Typography variant="h2">{`PERJANJIAN PELABURAN`}</Typography>

          <Typography variant="span">{`Perjanjian ini diperbuat pada 01 haribulan Januari 2023`}</Typography>

          <Typography variant="span">{`ANTARA`}</Typography> */}
        {signImg && (
          <Avatar
            src={`${signImg}`}
            style={{
              width: '50%',
              height: 'auto',
              borderRadius: '0px',
              backgroundColor: 'transparent'
            }}
          />
        )}
        {/* <pdfFromReact /> */}
      </div>
    </>
  );
};

export default AggrementPdf;
