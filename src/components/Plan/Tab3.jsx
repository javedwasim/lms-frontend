import { Col, Container, Row } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';

import { useCart } from '@/hooks/cart';
import { purchasePlan, callStripe } from '@/requests/stripe';

export default function Tab3({ setTab, type }) {
  const { data: cart } = useCart(type);

  const handleCheckout = async () => {
    const response = await purchasePlan(type, courseIds, packageIds, totalAmount);

    if (response.status) {
      const stripeResponse = await callStripe(
        response.data.order_id,
        totalAmount
      );

      window.location.replace(stripeResponse.payment_url);
    }
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  let courseIds = [];
  if (cart && cart.length > 0) {
    courseIds = cart.map((item) => {
      return item.courseId;
    });
  }

  let packageIds = [];
  if (cart && cart.length > 0) {
    packageIds = cart.map((item) => {
      return item.packageId;
    });
  }

  let totalAmount = 0;
  totalAmount = cart.reduce(
    (acc, item) => acc + parseInt(item.package.price),
    0
  );

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={4}>
            <button onClick={() => setTab(2)} className="submitbtns">
              <BiArrowBack /> Back
            </button>
          </Col>

          <Col md={12}>
            <div className="packages-heading text-center">
              <h2>Checkout</h2>
            </div>
          </Col>

          <Col md={{ span: 6, offset: 3 }}>
            <div className="monthly-plan">
              <div className="heading-mon">
                <h3>My Plan</h3>
              </div>

              <div className="patment-detail-pay">
                {cart &&
                  cart.length > 0 &&
                  cart.map((item) => (
                    <p>
                      <strong>{item?.courseName} </strong>{' '}
                      <span>
                        {item?.package?.packagetype === 'onetime' &&
                          'One Time Specific Date'}
                        {item?.package?.packagetype ===
                          'subscription_onetime' && 'One Time Specific Month'}
                        {item?.package?.packagetype === 'subscription' &&
                          'Subscription'}
                        {item?.package?.packagetype === 'free' && 'Free'} | £
                        {item?.package?.price}
                      </span>
                    </p>
                  ))}
              </div>

              <div className="total-pay">
                <h4>
                  <strong>Total</strong> £{totalAmount}
                </h4>
              </div>

              <div className="add-cart-detail mt-5">
                <button onClick={handleCheckout}>Pay On Stripe</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
