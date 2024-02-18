"use client"

import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import DummyImg from '../../../../images/dummy.jpg';
import { AuthContext } from '../../../../context/AuthContext';

interface BlogDetail {
    title: string;
    description: string;
    content: string;
    createdAt: string; 
}
const DetailBlog = () => {
    const {blogId} = useParams();
    const [blogDetail, setBlogDetails]=useState<BlogDetail | null>(null);
    const [isLaoding , setIsLoading]= useState(false);

    const fetchBlog= () =>{
        setIsLoading(true);
        axios.get(`${process.env.NEXT_APP_API_URL}/blog/blog/${blogId}`).then((res)=>{
            console.log(res);
            setBlogDetails(res?.data?.blog);
            setIsLoading(false);
        }).catch((err)=>{
            console.log(err);
            setIsLoading(false);
        })
    }
    useEffect(()=>{
       fetchBlog();
    },[blogId])



  return (
    <Container>
<div>DetailBlog</div>

{isLaoding?<p>loading...</p>:<Box sx={{p:{xs:1, lg:2}}}>
<Grid container  sx={{ my: 10 }}>
              <Grid item xs={12} lg={9}>
              <Box className='blog_image_Box'>
                  {/* eslint-disable-next-line */}
                  <Image
                    src={DummyImg}
                    alt={blogDetail?.title ||''}
                    className='blog_image'
                  />
                </Box>
                <Box className='text-3xl my-5 '>{blogDetail?.title}</Box>
                <p className='blog_description my-3 opacity-60'>{blogDetail?.description}</p>
                <div className='my-20 ' dangerouslySetInnerHTML={{ __html: blogDetail?.content ||''}} />
                <p className='my-3'>Created At : {moment(blogDetail?.createdAt).format("DD-MM-YYYY   hh:mm:ss")}</p>
              </Grid>
              <Grid item xs={12} lg={3} sx={{ pl: {xs:0, lg:3} }}>
            <p className='text-xl mb-7'>Blog suggestions</p>
              </Grid>
            </Grid>
</Box>}
    </Container>

  )
}

export default DetailBlog