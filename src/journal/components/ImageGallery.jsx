import { ImageListItem, ImageList } from '@mui/material';

export const ImageGallery = ({images}) => {

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { images.map((img, i) => (
        <ImageListItem key={img} sx={{ overflow: 'hidden'}}>
          <img
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={`image-${i}`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}