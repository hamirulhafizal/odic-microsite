import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { pdfFromReact } from 'generate-pdf-from-react-html';

const AggrementPdf = ({ signImg }) => {
  return (
    <>
      <div>
        <div className="element-to-print">
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
            <Avatar
              src="assets/images/rhb-logo.png"
              style={{
                width: '50%',
                height: 'auto',
                borderRadius: '0px',
                backgroundColor: 'transparent'
              }}
            />
            <Typography variant="h2">{`Example page`}</Typography>
            <Typography variant="span">
              {`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste quia dicta itaque sunt fuga, illo ad eaque ea commodi
              temporibus perferendis provident doloribus non iusto asperiores excepturi autem facere qui!`}
            </Typography>
            {`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste quia dicta itaque sunt fuga, illo ad eaque ea commodi temporibus
            perferendis provident doloribus non iusto asperiores excepturi autem facere qui!`}
            <Avatar
              src={`${signImg}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '0px',
                backgroundColor: 'transparent'
              }}
            />
          </Box>
        </div>

        <pdfFromReact />
      </div>
    </>
  );
};

export default AggrementPdf;
