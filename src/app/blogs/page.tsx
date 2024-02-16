import { Box, Container, Divider, Grid } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

const Blogs = () => {
  const blogslist: {
    title: string;
    description: string;
    image: string;
    content: string;
  }[] = [
    {
      title: 'my first blog ',
      description:
        "Typo or casing issue: Double-check for any typos or casing errors in your import statement. JavaScript is case-sensitive, so make sure you're using the correct casing Check the documentation: If you're still having trouble, refer to the documentation of react-hook-form to ensure youre using the correct syntax and API",
      image:
        'http://www.shadowsphotography.co/wp-content/uploads/2017/12/photography-01-800x400.jpg',
      content: '<h1>first blog content</h1>',
    },
    {
      title: 'my second blog',
      description: 'my second blog description',
      image:
        'http://www.shadowsphotography.co/wp-content/uploads/2017/12/photography-01-800x400.jpg',
      content: '<h1>second blog content</h1>',
    },
    {
      title: 'my third blog ',
      description: 'my third blog description',
      image:
        'http://www.shadowsphotography.co/wp-content/uploads/2017/12/photography-01-800x400.jpg',
      content: '<h1>third blog content</h1>',
    },
    {
      title: 'my fourth blog ',
      description: 'my fourth blog description',
      image:
        'http://www.shadowsphotography.co/wp-content/uploads/2017/12/photography-01-800x400.jpg',
      content: '<h1>fourth blog content</h1>',
    },
  ];
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <Container sx={{ px: 2, py: { xs: 5, lg: 10 } }}>
        <div role='presentation' style={{ paddingTop: '1rem' }}>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link
              underline='hover'
              sx={{ display: 'flex', alignItems: 'center' }}
              color='inherit'
              href='/'
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
              Home
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color='text.primary'
            >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize='inherit' />
              blogs
            </Typography>
          </Breadcrumbs>
        </div>

        {blogslist?.map((blog, index) => (
          <>
            {' '}
            <Grid container key={index} sx={{ my: 10 }}>
              <Grid item xs={12} lg={7} sx={{ pr: 3 }}>
                <Box className='text-3xl '>{blog.title}</Box>
                <p className='blog_description'>{blog.description}</p>
                <button className='blog_readmore_button'>read more.</button>
              </Grid>
              <Grid item xs={12} lg={5} sx={{ pl: 3 }}>
                <Box className='blog_image_Box'>
                  {/* eslint-disable-next-line */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='blog_image'
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider />
          </>
        ))}
      </Container>
    </>
  );
};

export default Blogs;
