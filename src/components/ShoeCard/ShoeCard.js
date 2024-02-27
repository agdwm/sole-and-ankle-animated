import React from 'react';
import styled from 'styled-components/macro';

import { WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
        {variant === 'new-release' && (
          <NewFlag>Just released!</NewFlag>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color':
                variant === 'on-sale'
                  ? 'var(--color-gray-700)'
                  : undefined,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  /*
    Image zooms in on hover/focus,
    truncate the spillover
  */
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  transition: transform 600ms;
  transition-timing-function: var(--transition-ease);
  transform-origin: center 80%;
  will-change: transform;

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    /* .link:hover .image, .link:focus .image */
    ${Link}:hover &,
    ${Link}:focus & {
      transform: scale(1.1);
      transition: transform 200ms;
    }
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;
  transition: border-color 0.3s;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 3px;
    width: 100%;
    left: -100%;
    transition: left 500ms;
    transition-timing-function: var(--transition-ease);
    will-change: left;

    ${Link}:hover &,
    ${Link}:focus & {
      left: 0;
      transition: left 200ms;
    }
  }

`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);

  &::before {
    background-color: inherit;
    filter: brightness(0.6);
  }
`;

const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);

  &::before {
    background-color: inherit;
    filter: brightness(0.6);
  }
`;

export default ShoeCard;
