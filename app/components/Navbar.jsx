var React = require('react');

var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">NEF</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <form className="navbar-form navbar-left" role="search">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search"/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Go!</button>
              </span>
            </div>
          </form>
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#">Stats</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Top 100
                <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">Top Overall</a></li>
                <li className="dropdown-submenu">
                  <a href="#">Caldari</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Achura</a></li>
                    <li><a href="#">Civire</a></li>
                    <li><a href="#">Deteis</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Gallente</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Gallente</a></li>
                    <li><a href="#">Intaki</a></li>
                    <li><a href="#">Jin-Mei</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Minmatar</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Brutor</a></li>
                    <li><a href="#">Sebiestor</a></li>
                    <li><a href="#">Vherokior</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Amarr</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Amarr</a></li>
                    <li><a href="#">Ni-Kunni</a></li>
                    <li><a href="#">Khanid</a></li>
                  </ul>
                </li>
                <li className="divider"></li>
                <li><a href="#">Hall of Shame</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Female
                <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">All</a></li>
                <li className="dropdown-submenu">
                  <a href="#">Caldari</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Achura</a></li>
                    <li><a href="#">Civire</a></li>
                    <li><a href="#">Deteis</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Gallente</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Gallente</a></li>
                    <li><a href="#">Intaki</a></li>
                    <li><a href="#">Jin-Mei</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Minmatar</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Brutor</a></li>
                    <li><a href="#">Sebiestor</a></li>
                    <li><a href="#">Vherokior</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Amarr</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Amarr</a></li>
                    <li><a href="#">Ni-Kunni</a></li>
                    <li><a href="#">Khanid</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Male
                <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">All</a></li>
                <li className="dropdown-submenu">
                  <a href="#">Caldari</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Achura</a></li>
                    <li><a href="#">Civire</a></li>
                    <li><a href="#">Deteis</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Gallente</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Gallente</a></li>
                    <li><a href="#">Intaki</a></li>
                    <li><a href="#">Jin-Mei</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Minmatar</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Brutor</a></li>
                    <li><a href="#">Sebiestor</a></li>
                    <li><a href="#">Vherokior</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Amarr</a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Amarr</a></li>
                    <li><a href="#">Ni-Kunni</a></li>
                    <li><a href="#">Khanid</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="#">Add</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;