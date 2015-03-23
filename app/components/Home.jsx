var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h3 className="text-center">Click on the portrait. Select your favorite.</h3>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-5 col-md-offset-1">
            <div className="thumbnail fadeInUp animated">
              <img src="http://image.eveonline.com/Character/230694467_512.jpg"/>
              <div className="caption text-center">
                <ul className="list-inline">
                  <li><strong>Race:</strong> Caldari</li>
                  <li><strong>Bloodline:</strong> Civire</li>
                </ul>
                <h4><a href="#characters/94194586"><strong>Don Cristo Guerrero</strong></a></h4>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-5">
            <div className="thumbnail fadeInUp animated">
              <img src="http://image.eveonline.com/Character/723304069_512.jpg"/>
              <div className="caption text-center">
                <ul className="list-inline">
                  <li><strong>Race:</strong> Caldari</li>
                  <li><strong>Bloodline:</strong> Civire</li>
                </ul>
                <h4><a href="#characters/94194586"><strong>Don Cristo Guerrero</strong></a></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;