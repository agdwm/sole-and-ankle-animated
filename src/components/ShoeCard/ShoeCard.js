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
  const variant =
    typeof salePrice === 'number'
      ? 'sale'
      : isNewShoe(releaseDate)
        ? 'new-release'
        : 'default';

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant === 'sale' && <CustomFlag variant="sale">Sale</CustomFlag>}
        {variant === 'new-release' && (
          <CustomFlag variant="new-release">Just released!</CustomFlag>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color':
                variant === 'sale' ? 'var(--color-gray-700)' : undefined,
              '--text-decoration':
                variant === 'sale' ? 'line-through' : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
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

const CustomFlag = styled(Flag)`
  background-color: ${props =>
    props.variant === 'sale'
      ? 'var(--color-primary)'
      : 'var(--color-secondary)'
  };

  &::before {
    background-color: ${props =>
    props.variant === 'sale'
      ? 'color-mix(in srgb, var(--color-primary) 70%, black)'
      : 'color-mix(in srgb, var(--color-secondary) 70%, black)'
  };
  }
`;

export default ShoeCard;
