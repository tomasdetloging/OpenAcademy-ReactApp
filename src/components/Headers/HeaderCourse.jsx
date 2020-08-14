import React from "react";

class HeaderCourse extends React.Component {
  render() {
    let course = this.props.course;
    return (
      <div className="intro-section single-cover" id="home-section">
        <div
          className="slide-1 "
          style={{
            backgroundImage: "url(" + require("assets/images/img_2.jpg") + ")",
          }}
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="row justify-content-center align-items-center text-center">
                  <div className="col-lg-6">
                    <h1 data-aos="fade-up" data-aos-delay="0">
                      {course? course.course_title:null}
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                      4 Lessons / 12 Week &bullet; 2,193 students &bullet;{" "}
                      <a href="#" className="text-white">
                        6 comments
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderCourse;