import { BackBtn, Container, Wrapper, Footer } from './styles/setting.styles';
import { MdChevronLeft } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import EditProfileForm from '../components/EditProfileForm';

const EditProfilePage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Container>
        <div style={{ height: '20px' }}></div>
        <BackBtn onClick={() => history.push('/setting')}>
          <MdChevronLeft />
          Back
        </BackBtn>
        <EditProfileForm />
      </Container>
      <Footer>
        <span className='username'>
          Created by{' '}
          <Link
            style={{ color: '#2F80ED', textDecoration: 'underline' }}
            to='/'
          >
            Luongdao
          </Link>
        </span>
        <span className='dev'>devChallenges.io</span>
      </Footer>
    </Wrapper>
  );
};

export default EditProfilePage;
