import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';

import * as Chips from '../chips';
import * as Tags from '../tags';

const NovelList = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        目を覚ますとエンジニアに転生していた...
      </Typography>
      <Typography variant='h5' component='div'>
        エンジニア転生
      </Typography>
      <Typography display='flex' sx={{ color: 'text.secondary', mb: 1.5 }}>
        <Chips.PopularChips />
        <Chips.NewArrivalsChips />
      </Typography>
      <Typography display='flex' sx={{ color: 'text.secondary', mb: 1.5 }}>
        <Box paddingRight={2}>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/1.jpg'
            sx={{ width: 24, height: 24, backgroundColor: 'secondary.main' }}
          />
        </Box>
        <Box display='flex'>
          <Box marginRight={1}>
            <Tags.LoveStoryTags />
          </Box>
          <Tags.FantasyTags />
        </Box>
      </Typography>
      <Typography
        variant='body2'
        display='flex'
        justifyContent='left'
        alignItems='center'
      >
        <Box component={VisibilityIcon} marginRight={1} />
        100
        <Box marginLeft={2}>
          <Typography variant='body2'>2024/08/20</Typography>
        </Box>
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined' sx={{ borderColor: 'black' }}>
        {NovelList}
      </Card>
    </Box>
  );
}
