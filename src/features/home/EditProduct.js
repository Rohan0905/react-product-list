import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles/editProduct';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { products } from '../../utils/Constants';


export class EditProduct extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      priceTier: '',
      productData: {
        pricingTier: '',
        priceRange: '',
        weight: '',
        availability: '',
        productUrl: '',
        isEditable: true,
      },
    };
  }

  priceTierHandleChange = event => {
    this.setState({
      pricingTier: event.target.value,
    });

  };

  componentDidMount() {
    const { classes, home = {}, match = {} } = this.props;
    const { productList = [] } = home;
    const { params = {} } = match;
    const { productId = {} } = params;
    let productData = productList[productId] ? productList[productId] : {};
    this.setState({
      productData: productData,
      name: productData.name,
      pricingTier: productData.pricingTier,
      priceRange: productData.priceRange,
      weight: productData.weight,
      availability: productData.availability,
      productUrl: productData.productUrl,
      isEditable: productData.isEditable,
      productId: productId,
    });

  }

  render() {
    const { classes, home = {}, match = {} } = this.props;
    const {
      name = '',
      pricingTier = '',
      priceRange = '',
      weight = '',
      availability = '',
      productUrl = '',
      isEditable = true,
    } = this.state;


    return (
      <div className="home-edit-product">
        <h3>{`Edit Product`}</h3>
        <div className={classes.productWrapper}>
          <div className={classes.root}>
            <div className={classes.productInputField}>
              <TextField id="outlined-basic" name={'name'} label="Name" variant="outlined" value={name}
                         onChange={e => this.handleChange(e)}/>
            </div>
            <div className={classes.productInputField}>
              <TextField id="outlined-basic" name={'weight'} type="number" value={weight} label="Weight"
                         variant="outlined" onChange={e => this.handleChange(e)}/>
            </div>
            <div className={classes.productInputField}>
              <TextField id="outlined-basic" type="number" name={'availability'} value={availability}
                         label="Availability" variant="outlined" onChange={e => this.handleChange(e)}/>
            </div>
            <div className={classes.productInputField}>
              <TextField id="outlined-basic" label="Product Url" value={productUrl} variant="outlined"
                         name={'productUrl'} onChange={e => this.handleChange(e)}/>
            </div>
            <div className={classes.productInputField}>
              <FormControl component="fieldset" fullWidth className={classes.radioMainForm}>
                <RadioGroup
                  aria-label="payment"
                  name="type"
                  label=""
                  className="radioGroupType"
                  value={pricingTier}
                  onChange={value => this.priceTierHandleChange(value)}
                  row
                  color="primary"
                >
                  <FormControlLabel
                    value="budget"
                    control={<Radio label={this.props.label}/>}
                    label="budget"
                    className="radioInputButton"
                  />
                  <FormControlLabel
                    value="premier"
                    control={<Radio label={this.props.label}/>}
                    label="premier"
                    className="radioInputButton"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <button onClick={() => {
              this.onSave();
            }}>save
            </button>
          </div>
        </div>
      </div>
    );
  }

  onSave() {
    const { actions, home = {} } = this.props;
    const { updateProduct } = actions;
    const { productList = [] } = home;
    const {
      name = '',
      pricingTier = '',
      priceRange = '',
      weight = '',
      availability = '',
      productUrl = '',
      isEditable = true,
      productId,
    } = this.state;

    if(!name) {
      alert('Please add name');
    } else if (!weight) {
      alert('Please enter weight');
    } else if (!weight) {
      alert('Please enter weight');
    } else if (!productUrl) {
      alert('Please enter product url');
    } else if (!pricingTier) {
      alert('Please select pricing option');
    }
    else { 
      let product = {
        name: name,
        pricingTier: pricingTier,
        priceRange: priceRange,
        weight: parseInt(weight),
        availability: parseInt(availability),
        productUrl: productUrl,
        isEditable: isEditable,
      };
      let _productList = productList.slice();
      _productList[productId] = product;
      console.log(_productList);
      updateProduct(_productList);
      this.props.history.push('/');
    }

    
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(EditProduct));
