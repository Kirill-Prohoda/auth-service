import React from 'react';
import MenuLayout from '../../layouts/menuLayout/MenuLayout';
import { Container, ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

const randomImg = (count: number) => {
  const arrayImg = [];

  while (count) {
    arrayImg.push({
      img: `https://loremflickr.com/640/360/car?random=${count}`,
      title: `Random img${count}`,
      author: `Random author${count}`,
    });
    --count;
  }
  return arrayImg;
};

const Main = () => {
  return (
    <MenuLayout>
      <Container maxWidth="xl">
        <ImageList sx={{ width: '100%', height: '100%' }}>
          <ImageListItem key="Subheader" cols={2}></ImageListItem>
          {randomImg(8).map(item => (
            <ImageListItem key={item.img}>
              <img src={item.img} srcSet={item.img} alt={item.title} loading="lazy" />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </MenuLayout>
  );
};

export default Main;
