import { Avatar, Box, Divider, List, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import moment from 'moment';

const ComponentToPrint = React.forwardRef((props, ref) => {
  const { children, isPreview } = props;
  const date = new Date();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <div ref={ref} className="parentPage">
        <div className={isPreview ? 'preview' : 'page'}>
          <Stack sx={{ width: '100%', textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                opacity: 0.5,
                pt: 4,
                textDecoration: 'underline'
              }}
            >
              PERJANJIAN PELABURAN
            </Typography>
          </Stack>
          <Box
            sx={{
              justifyContent: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <br />
            <Typography
              variant="h3"
              sx={{
                textTransform: 'uppercase'
              }}
            >
              [ TARIKH : {moment(date).format('DD MMMM YYYY')} ]
            </Typography>
            <br />
            <br />
            <Typography variant="h3">ANTARA</Typography>

            <Typography variant="h4">
              MUHAIZAN BIN ABU@HUSSIN <br />
              [NO K/P: 750611-01-5643]
            </Typography>
            <br />
            <br />
            <Typography variant="h3">{`[INVESTOR]`}</Typography>
            <br />
            <br />
            <Typography variant="h3">{`DAN`}</Typography>
            <br />
            <br />
            <Typography variant="h4">
              OD LEGACY REALTY SDN <br /> [BHD SSM NO: 1390527M]
            </Typography>
            <br />
            <br />
            <Typography variant="h3">{`[INVESTEE]`}</Typography>
            <br />
          </Box>
        </div>

        <div className={isPreview ? 'preview' : 'page'}>
          <Stack sx={{ width: '100%', textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                opacity: 0.5,
                pt: 4,
                textDecoration: 'underline'
              }}
            >
              PERJANJIAN PELABURAN
            </Typography>
          </Stack>

          <br />
          <Typography variant="p">Perjanjian ini diperbuat pada {moment(date).format('DD MMMM YYYY')}</Typography>
          <br />

          <Stack direction="row" sx={{ width: '100%', textAlign: 'start', fontWeght: 'bold', color: 'black' }}>
            <Typography variant="p">ANTARA</Typography>
          </Stack>
          <br />
          <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
            <Typography variant="p">
              <b>MUHAIZAN BIN ABU@HUSSIN (NO. K/P: 750611-01-5643)</b> yang beralamat di No 2 Jalan Haji Abu Husin Rahman, Kampung Desa
              Pahlawan, Jalan Kluang, 86100 Ayer Hitam, Johor (selepas ini dirujuk “Pihak Pertama”);
            </Typography>
          </Stack>
          <br />
          <Stack direction="row" sx={{ width: '100%', textAlign: 'start', fontWeght: 'bold', color: 'black' }}>
            <Typography variant="p">DAN</Typography>
          </Stack>
          <br />
          <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
            <Typography variant="p">
              <b>OD LEGACY REALTY SDN BHD (1390527M)</b> yang beralamat di No. 79-02 Jalan Aliff 4, Damansara Aliff Square 81200 Johor
              Bahru, Johor (selepas ini dirujuk “Pihak Kedua”).
            </Typography>
          </Stack>
          <br />
          <Stack direction="row" sx={{ width: '100%', textAlign: 'start', fontWeght: 'bold', color: 'black', textDecoration: 'underline' }}>
            <Typography variant="p">
              <b>ADALAH DENGAN INI DIPERSETUJUI BAHAWA:</b>
            </Typography>
          </Stack>
          <br />

          <Stack sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                flexDirection: 'column'
              }}
            >
              <ol>
                <li>
                  Pihak pertama bersetuju memberi modal untuk memberi modal untuk satu perniagaan yang sah bawah undang-undang di Malaysia
                </li>
                <br />

                <li>
                  Pihak pertama dan pihak kedua bersetuju bahawa:
                  <br />
                  <br />
                  <ol class="c">
                    <li>
                      Pihak pertama mengakujanji bahawa pihak pertama akan memberikan wang modal sebanyak Ringgit Malaysia Tiga Ratus Ribu
                      (RM300,000.00) sahaja.
                    </li>
                    <br />

                    <li>
                      Pihak Pertama dan kedua akan menguruskan perniagaan dan bersetuju memberi sebanyak Tiga Puluh Percent (30%) dalam
                      tempoh 14 bulan daripada jumlah modal.
                    </li>
                    <br />

                    <li>
                      Pihak pertama dan kedua bersetuju bahawa perjanjian ini hanya mengikat kedua-dua belah pihak sehingga/ setakat tempoh
                      perjanjian ini selama 14 bulan iaitu bermula{' '}
                      <b>
                        {moment(date).format('DD MMMM YYYY')} sehingga {moment(date.setMonth(date.getMonth() + 14)).format('DD MMMM YYYY')}
                      </b>
                    </li>
                  </ol>
                </li>

                <br />

                <li>
                  Pihak pertama dan pihak kedua bersetuju bahawa melantik{' '}
                  <b>
                    Tetuan Syazwan Syazani & Partners, Peguambela dan Peguamcara yang beralamat di No 11.01 Jalan Pertama 5, Pusat
                    Perdagangan Danga Utama 81300 Johor Bahru Johor
                  </b>{' '}
                  setakat menyediakan dan/ atau menguruskan perjanjian pelaburan sehingga tamat perjanjian dan menguruskan setelah kedua-dua
                  belah pihak bersetuju dengan syarat- syarat yang terkandung didalam perjanjian ini.
                </li>
                <br />
              </ol>
            </Box>
          </Stack>
        </div>

        <div className={isPreview ? 'preview' : 'page'} style={{ paddingTop: '5%' }}>
          <Stack sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                flexDirection: 'column'
              }}
            >
              <ol start="4">
                <li>
                  Pihak pertama dan pihak kedua bersetuju bahawa Tetuan Syazwan Syazani & Partners hanya terlibat dalam penyediaan dan/atau
                  pengurusan Perjanjian Pelaburan antara keduadua belah pihak dan sebarang perbincangan lanjut berkenaan permohonan tersebut
                  adaah diluar bidang kuasa <b>Tetuan Syazwan Syazani & Partners.</b>
                </li>

                <br />
                <li>
                  Pihak Kedua bersetuju bahawa akan menanggung kos guaman, kos kaveat, kos setem perjanjian dan perbelanjaan berkaitan
                  perjanjian pelaburan yang ditandatangani akan dibayar kepada <b>Tetuan Syazwan Syazani & Partners.</b>
                </li>

                <br />

                <li>
                  Selagi apa-apa maklumat yang terkandung di dalam Perjanjian ini dana pa- apa maklumat yang disediakan kepada mana-mana
                  pihak di bawah ini tidak diterbitkan atau diketahui umum, maka maklumat tersebut akan dianggap sebagai makulmat sulit dan
                  setiap pihak bersetuju bahawa tidak mendedahkan kepada pengetahuan kepada mana-mana pihak ketiga.
                </li>

                <br />

                <li>Masa adalah pati dalam perjanjian ini;</li>
                <br />

                <li>
                  Perjanjian ini hendaklah dipatuhi oleh kedua-dua pihak kepada perjanjian ini dan ianya juga turut mengikat waris-waris,
                  representative serta pengganti kepada kedua-dua pihak dalam perjanjian ini.
                </li>
                <br />
              </ol>
            </Box>
          </Stack>
        </div>

        <div className={isPreview ? 'preview' : 'page'} style={{ paddingTop: '5%' }}>
          <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
            <Typography variant="p">
              BAGI MENYAKSIKAN PERJANJIAN INI PIHAK-PIHAK dalam perjanjian ini dengan ini menandatangani perjanjian ini pada hari dan tarikh
              yang dinyatakan di dalamnya.
            </Typography>
          </Stack>

          <br />
          <br />

          <Box
            sx={{
              width: matchDownSM ? '100%' : '50%',
              display: 'flex',

              flexDirection: matchDownSM ? 'column' : 'none',
              alignItems: matchDownSM ? 'center' : 'none'
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">
                  <b>Ditandatangani oleh</b>
                </Typography>
              </Stack>

              <br />

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">Pihak pertama</Typography>
              </Stack>

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">Di hadapan</Typography>
              </Stack>
            </Box>

            <Box sx={{ width: '50%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Box>
                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>

                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>

                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>

                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>
                </Box>
                <Box>{children}</Box>
              </Box>

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">……………………………………</Typography>
              </Stack>

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">
                  <b>MUHAIZAN BIN ABU@HUSSIN</b>
                </Typography>
              </Stack>
            </Box>
          </Box>

          <br />
          <br />

          <Box
            sx={{
              width: matchDownSM ? '100%' : '50%',
              display: 'flex',

              flexDirection: matchDownSM ? 'column' : 'none',
              alignItems: matchDownSM ? 'center' : 'none'
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">
                  <b>Ditandatangani oleh</b>
                </Typography>
              </Stack>

              <br />

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">Pihak kedua</Typography>
              </Stack>

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">Di hadapan</Typography>
              </Stack>
            </Box>

            <Box sx={{ width: '50%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Box>
                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>

                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>

                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>

                  <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                    <Typography variant="p">]</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Avatar
                    sx={{
                      width: '100%',
                      height: 'auto',
                      backgroundColor: 'white',
                      padding: '12px'
                    }}
                    alt="signature"
                    src={'/assets/images/sign/sign1.jpg'}
                  />
                </Box>
              </Box>

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">……………………………………</Typography>
              </Stack>

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">
                  <b>DIRECTOR / SECRETARY </b>
                </Typography>
              </Stack>

              <Stack direction="row" sx={{ width: '100%', textAlign: 'justify', color: 'black' }}>
                <Typography variant="p">
                  <b>(OD LEGACY REALTY SDN BHD)</b>
                </Typography>
              </Stack>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
});

export default ComponentToPrint;
