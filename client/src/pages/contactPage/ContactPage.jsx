import './contactPage.css';

const ContactPage = () => {
    return (
        <div>
            <div className="container contacts">
                <div className="row contact-list">
                    <div className="col-md-3 contact">
                        <p><i className="zmdi zmdi-phone"></i></p>
                         <p>Phone</p>
                         <a href="">+8801729892494</a>
                    </div>
                    <div className="col-md-3 contact ">
                        <p><i className="zmdi zmdi-email"></i></p>
                         <p>Email</p>
                         <a href="">sabbirhstuece@gmail.com</a>
                    </div>
                    <div className="col-md-3 contact ">
                        <p><i className="zmdi zmdi-pin"></i></p>
                         <p>Address</p>
                         <a href="">Birol, Dinajpur</a>
                    </div>
                </div>
            </div>

            <div className="contact-form">
                   <div className="content">
                        <div className="title">
                            <h3>Get In Touch</h3>
                        </div>
                        <form action="" className='input-form'>
                            <input className='input' type="text" placeholder='Your Name'/>
                            <input className='input' type="text" placeholder='Your Email'/>
                            <input className='input' type="text" placeholder='Your Phone Number'/>
                        </form>
                        <div>
                            <textarea className = 'text mt-5' name="" id="" cols="40" rows="10"></textarea>
                        </div>
                        <div className="button">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                   </div>
            </div>
        </div>
    );
};

export default ContactPage;