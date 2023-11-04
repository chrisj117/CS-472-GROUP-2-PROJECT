import Searchbar from '../components/Searchbar';

const School = () => {
  const schoolName = 'University of Nevada, Las Vegas';
  const schoolNameShort = 'UNLV';

  return (
    <>
      <h2>
        {schoolName} ({schoolNameShort})
      </h2>
      <Searchbar />
      <div></div>
    </>
  );
};
export default School;
