var React = require('react');

var AddCharacter = React.createClass({
  render: function() {
    return (
      <div className="row flipInX animated">
        <div className="col-sm-8">
          <div className='panel panel-default'>
            <div className='panel-heading font-bold'>Add Character</div>
            <div className='panel-body'>
              <form role='form'>
                <div className='form-group'>
                  <label>Character Name</label>
                  <input type='text' className='form-control' autoFocus />
                  <span className="help-block"></span>
                </div>
                <div className='form-group'>
                  <div className='radio radio-inline'>
                    <input type='radio' name='gender' id='female' value='female' />
                    <label htmlFor='female'>Female</label>
                  </div>
                  <div className='radio radio-inline'>
                    <input type='radio' name='gender' id='male' value='male' />
                    <label htmlFor='male'>Male</label>
                  </div>
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddCharacter;