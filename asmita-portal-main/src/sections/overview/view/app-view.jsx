import axios from 'axios';
import parse from 'html-react-parser';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import { sports } from 'src/assets/sports';
import Label from 'src/components/label';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------
import { jwtDecode } from 'jwt-decode';
function isExpired() {
  const token = localStorage.getItem('token');
  let data = token ? jwtDecode(token) : null;
  if (data) {
    if (data.exp <= Date.now() / 1000) {
      localStorage.removeItem('token');
      return true;
    }
    return false;
  } else {
    return true;
  }
}

export default function AppView() {
  let alsorole = '';
  if (localStorage.getItem('token') !== null)
    alsorole = jwtDecode(localStorage.getItem('token')).role;
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [editId, setEditId] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sport, setSport] = useState('Athletics (M)');
  const [day, setDay] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [initialTableContent, setInitialTableContent] = useState(null);
  if (alsorole === 'head' || alsorole === 'volunteer' || alsorole === 'executive') {
    useEffect(() => {
      setLoading(true);
      if (isExpired()) {
        alert('Please relogin to be able to make changes.');
        window.location.href = '/login';
      } else {
        // fetch(`http://localhost:8000/api/fixtures/`)
        fetch(`https://app-admin-api.asmitaiiita.org/api/fixtures`)
          .then((res) => {
            console.log('res: ', res);
            return res.json();
          })
          .then((allFixtures) => {
            console.log('all fixtures: ', allFixtures);
            setFixtures(allFixtures.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log('Error: ', err);
            setLoading(false);
          });
      }
    }, []);

    const handleAddFixture = async () => {
      setStatus(null);
      if (editMode) {
        alert('Toggle edit mode off first.');
      } else if (day === '') {
        alert('Day cannot be empty');
      } else {
        if (!isExpired()) {
          try {
            const data = {
              Sport: sport,
              Day: day,
              HTMLString: editorRef.current.getContent(),
            };
            console.log(data);
            if (data.HTMLString.length !== 0) {
              const res = await axios
                .post(
                  `https://app-admin-api.asmitaiiita.org/api/fixtures/create`,
                  //   `http://localhost:8000/api/fixtures/create`,
                  data,
                  {
                    headers: {
                      authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  }
                )
                .catch((err) => console.log(err))
                .then((res) => console.log(res));
              setStatus(`Successfully added fixture for Day ${data.Day}, ${data.Sport}`);
              alert(`Successfully added fixture for Day ${data.Day}, ${data.Sport}`);
              console.log(res);
            } else {
              setStatus('Failure while adding fixture');
              alert('Failure while adding fixture');
            }
          } catch (err) {
            setStatus('Failure while requesting to add error (HTTP)');
            alert('Failure while requesting to add error (HTTP)');
            console.log('Error occurred while making request to add fixture: ', err);
          }
        } else {
          setStatus('Relogin.');
          alert('Please relogin.');
          window.location.href = '/login';
        }
      }
    };
    const handleDeleteFixture = async (id) => {
      setStatus(null);
      try {
        if (!isExpired()) {
          console.log('id for deletion: ', id);
          const deletedFixture = await axios.delete(
            `https://app-admin-api.asmitaiiita.org/api/fixtures/${id}`,
            // `http://localhost:8000/api/fixtures/${id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          console.log('Deleted fixture: ', deletedFixture);
          const newFixtures = fixtures.filter((fixture) => fixture._id !== id);
          console.log('New fixtures: ', newFixtures);

          setFixtures(newFixtures);
          setStatus(
            `Successfully deleted fixture for Day ${deletedFixture.data.data.Day}, ${deletedFixture.data.data.Sport}`
          );
          alert(
            `Successfully deleted fixture for Day ${deletedFixture.data.data.Day}, ${deletedFixture.data.data.Sport}`
          );
        } else {
          setStatus('Relogin.');
          alert('Please relogin.');
          window.location.href = '/login';
        }
      } catch (err) {
        setStatus(
          `Failure while deleting fixture for Day ${deletedFixture.data.data.Day}, ${deletedFixture.data.data.Sport}`
        );
        alert(
          `Failure while deleting fixture for Day ${deletedFixture.data.data.Day}, ${deletedFixture.data.data.Sport}`
        );
        console.log('Error while delete request: ', err);
      }
    };
    const handleEditFixture = async (id) => {
      setStatus(null);
      if (!editMode) {
        alert('Toggle edit mode on.');
      } else {
        try {
          if (!isExpired()) {
            const newBody = {
              Sport: sport,
              Day: day,
              Date: new Date(),
              HTMLString: editorRef.current.getContent(),
            };
            const updatedFixure = await axios.patch(
              `https://app-admin-api.asmitaiiita.org/api/fixtures/${id}`,
              //   `http://localhost:8000/api/fixtures/${id}`,
              newBody,
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );
            console.log('Updated fixture: ', updatedFixure.data.data);
            const newFixtures = fixtures.map((fixture) => {
              if (fixture._id === id) return updatedFixure.data.data;
              return fixture;
            });
            console.log(newFixtures);
            setFixtures(newFixtures);
            setStatus(`Successfully edited fixture for Day ${newBody.Day}, ${newBody.Sport}`);
            alert(`Successfully edited fixture for Day ${newBody.Day}, ${newBody.Sport}`);
          } else {
            setStatus('Relogin.');
            alert('Please relogin.');
            window.location.href = '/login';
          }
        } catch (err) {
          setStatus(`Failure while editing fixture for Day ${newBody.Day}, ${newBody.Sport}`);
          setStatus(`Failure while editing fixture for Day ${newBody.Day}, ${newBody.Sport}`);
          console.log('Error while making request to edit fixture: ', err);
        }
      }
    };
    if (loading) return 'Loading';

    return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Fixtures
        </Typography>
        <h3>Create daywise fixtures:</h3>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              gap: '10px',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <InputLabel id="demo-simple-select-label">Sport: </InputLabel>
            <Select
              sx={{ width: '75%' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sport"
              onChange={(e) => {
                const currSport = e.target.value;
                setSport(currSport);
                // if (
                //   currSport.includes('Athletics') ||
                //   currSport.includes('Aquatics') ||
                //   currSport.includes('Powerlifting')
                // ) {
                //   setInitialTableContent(
                //     '<table style="border-collapse: collapse; width: 100%; border-width: 3px;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800; border-width: 3px;">Event</td><td style="text-align: center; font-weight: 800; border-width: 3px;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
                //   );
                //   // Editor.setContent(
                //   //   '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.3102%;"><col style="width: 33.3102%;"><col style="width: 33.3102%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Team 1</td><td style="text-align: center; font-weight: 800;">Team 2</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'
                //   // );
                // } else {
                //   setInitialTableContent(
                //     '<table style="border-collapse: collapse; width: 100%; border-width: 3px;" border="1"><colgroup><col style="width: 33.3102%;"><col style="width: 33.3102%;"><col style="width: 33.3102%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800; border-width: 3px;">Team 1</td><td style="text-align: center; font-weight: 800; border-width: 3px;">Team 2</td><td style="text-align: center; font-weight: 800; border-width: 3px;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'
                //   );
                //   // Editor.setContent(
                //   //   '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Event</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
                //   // );
                // }
              }}
              value={sport}
            >
              {sports.map((val) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </Box>
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              gap: '10px',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <InputLabel id="demo-simple-select-label">Day: </InputLabel>
            <TextField
              id="outlined-basic"
              label="Day"
              value={day}
              variant="outlined"
              onChange={(e) => {
                setDay(e.target.value);
              }}
              required="true"
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          <Editor
            onChange={log}
            apiKey="85bjwmmh2dtxsg0no1u3uo00xssyrfq6e9twg8fjwom04zty"
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            initialValue={initialTableContent}
            init={{
              height: '50vmin',
              toolbar_sticky: true,
              toolbar_sticky_offset: 64,
              selector: 'textarea',
              skin: 'oxide-dark',
              content_css: 'dark',
              statusbar: false,
              plugins: [
                'autolink',
                'lists',
                'advlist',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
                'quickbars',
              ],
              menubar: false,
              toolbar: [
                'styles| bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | removeformat | code | table | help',
              ],
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:17px }',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}
          >
            {(!editMode && (
              <Button
                variant="contained"
                onClick={() => {
                  handleAddFixture();
                }}
              >
                Submit
              </Button>
            )) || (
              <Button variant="contained" disabled>
                Submit
              </Button>
            )}

            {(editMode && (
              <Button
                variant="contained"
                onClick={() => {
                  handleEditFixture(editId);
                }}
              >
                Edit
              </Button>
            )) || (
              <Button variant="contained" disabled>
                Edit
              </Button>
            )}
          </Box>
          {status && <p>{status}</p>}
          <p>
            Set edit mode:{' '}
            <Switch
              id="toggleEditMode"
              checked={editMode}
              onClick={() => {
                setEditMode(!editMode);
              }}
            />
          </p>
        </Box>

        <h3>View and edit fixtures</h3>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '100px',
          }}
        >
          {fixtures?.map((fixture, key) => {
            console.log('fixture: ', fixture._id);
            return (
              <div style={{ width: '50%' }}>
                <h3>
                  Day {fixture.Day}, {fixture.Sport}
                </h3>
                {fixture.HTMLString && parse(fixture.HTMLString)}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    textAlign: 'center',
                    marginTop: '30px',
                  }}
                >
                  <Button
                    sx={{ marginBottom: '100px', backgroundColor: '#f24e4e' }}
                    variant="contained"
                    onClick={() => handleDeleteFixture(fixture._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    sx={{ marginBottom: '100px' }}
                    variant="contained"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setDay(fixture.Day);
                      setSport(fixture.Sport);
                      setInitialTableContent(fixture.HTMLString);
                      setEditId(fixture._id);
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </div>
            );
          })}
        </Box>
      </Container>
    );
  } else {
    return <h1>NOT AUTHORISED</h1>;
  }
}
