import React,{Component} from 'react'
import Combine from '../Combine/Combine'
import Modal from '../../UI/Modal/Modal'

const withErrorHandler=(WrappedCOmponent, axios) =>
{

   
    return class extends Component
    {
        state={
            error:null
        }

        componentWillMount()
        {
            this.requestInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.responseInterceptor=axios.interceptors.response.use(res=> res, error=>{
                this.setState({error : error});
            });

        }
        errorConfirmedHandler= ()=>{
            this.setState({error:null});
        }

        componentWillUnmount()
        {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render()
        {     
               return (   
                 <Combine>
            <Modal show={this.state.error} 
                    closehandler={this.errorConfirmedHandler}> 
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedCOmponent {...this.props} />

        </Combine>
        );

        }


    };
}
export default withErrorHandler;