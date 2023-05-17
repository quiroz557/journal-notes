import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList sx={{ width: '100%', height: 550 }} cols={4} rowHeight={164}>
      {images.map((img) => (
        <ImageListItem key={img}>
          <img
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={img}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
