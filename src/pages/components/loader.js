import LoaderImage from '../../assets/images/loadernew.gif'
export const Loader = ({ points = 100, percentage = 100 }) => {
  return(
    <div className="loaderDiv">
    <div style={{height:"25vh",width:"25vh"}}>
    <img src={LoaderImage} />
      </div>
    </div>

  )
 
};
