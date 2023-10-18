import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Components/CSS/Footer.css";

function Footer() {
  return (
    <div className="final">
      <div className="bottom mt-3">
        <Row>
          <Col>
            <h1 className="tag">@Chung Chấn Nguyên</h1>
          </Col>
          <Col className="mt-4 ifram">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d125415.78425334135!2d106.6239639!3d10.7926718!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1695968591365!5m2!1svi!2s"
              width="500"
              height="250"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
