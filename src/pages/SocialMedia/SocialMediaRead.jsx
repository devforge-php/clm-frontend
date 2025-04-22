import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { Card, CardHeader, Typography, Button, CardBody } from '@material-tailwind/react';
import { $api } from '../../utils';
import { useTranslation } from 'react-i18next';
import SocialMediaTableEdit from '../../components/SocialMediaTableEdit';
import SocialMediaTableAdd from '../../components/SocialMediaTableAdd';
import { Helmet } from 'react-helmet';

export default function SocialMediaRead() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: profile = { username: 'Noma\'lum' } } = useQuery(
    ['profile'],
    () => $api.get('/profile').then(r => r.data.user),
    { staleTime: 5*60*1000, refetchOnWindowFocus: false }
  );

  const { 
    data: socialMedia = { id:null, telegram:'', instagram:'', facebook:'', youtube:'', twitter:'' },
    isLoading: mediaLoading
  } = useQuery(
    ['socialMedia'],
    () => $api.get('/socialMedia').then(res => {
      const arr = Array.isArray(res.data) ? res.data : res.data.data || [];
      return arr[0] || { id:null, telegram:'', instagram:'', facebook:'', youtube:'', twitter:'' };
    }),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,   // **ESKI** ma'lumot loading paytida ham ko‘rinadi
    }
  );

  const usernames = {
    telegram: socialMedia.telegram,
    instagram: socialMedia.instagram,
    facebook: socialMedia.facebook,
    youtube: socialMedia.youtube,
    twitter: socialMedia.twitter,
  };

  const handleSaveEdit = async updated => {
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([k, v]) => v && params.append(`${k}_user_name`, v));
    if (socialMedia.id) {
      await $api.put(`/socialMedia/${socialMedia.id}?${params.toString()}`);
      queryClient.invalidateQueries(['socialMedia']);
    }
    setOpenEdit(false);
  };

  const handleAdd = async newData => {
    const payload = {};
    Object.entries(newData).forEach(([k,v]) => payload[`${k}_user_name`] = v || '');
    if (Object.values(payload).some(v=>v.trim())) {
      await $api.post('/socialMedia', payload);
      queryClient.invalidateQueries(['socialMedia']);
    }
    setOpenAdd(false);
  };

  return (
    <div>
      <Helmet><title>Social Media Links - CLM</title></Helmet>
      <Card className="w-full max-w-[900px] mx-auto mt-4">
        <CardHeader floated={false} shadow={false} className="rounded-none flex justify-between items-center">
          <Typography variant="h5">{t('socialMediaLinks')}</Typography>
          <div className="flex gap-4">
            <Button size="sm" onClick={()=>setOpenEdit(true)}><PencilIcon className="h-4 w-4" /> Edit</Button>
            <Button size="sm" onClick={()=>setOpenAdd(true)}><UserPlusIcon className="h-4 w-4" /> Add</Button>
          </div>
          <Typography>{t('member')}: {profile.username}</Typography>
        </CardHeader>
        <CardBody className="px-0">
          <table className="w-full text-left">
            <thead>…</thead>
            <tbody>
              {Object.entries(usernames).map(([plat, name]) => name && (
                <tr key={plat}>
                  <td className="p-4">{plat.charAt(0).toUpperCase()+plat.slice(1)}</td>
                  <td className="p-4">{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <SocialMediaTableEdit
        open={openEdit}
        handleClose={()=>setOpenEdit(false)}
        usernames={usernames}
        handleSave={handleSaveEdit}
      />
      <SocialMediaTableAdd
        open={openAdd}
        handleClose={()=>setOpenAdd(false)}
        newUsernames={usernames}
        setNewUsernames={()=>{}}
        handleAdd={handleAdd}
      />
    </div>
  );
}
