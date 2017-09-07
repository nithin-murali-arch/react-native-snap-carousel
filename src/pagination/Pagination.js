import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import PaginationDot from './PaginationDot';
import styles from './Pagination.style';

export default class Pagination extends Component {

    static propTypes = {
        dotsLength: PropTypes.number.isRequired,
        activeDotIndex: PropTypes.number.isRequired,
        containerStyle: ViewPropTypes.style,
        dotStyle: ViewPropTypes.style,
        inactiveDotOpacity: PropTypes.number,
        inactiveDotScale: PropTypes.number
    };

    get dots () {
        const {
            dotsLength,
            activeDotIndex,
            dotStyle,
            inactiveDotOpacity,
            inactiveDotScale,
            parentThis,
            colorsArray
        } = this.props;

        let dots = [];
        var onPressFunction = function(index){
            //var index = parseInt(key.props.children.key.split("-")[2]);
            //index = parseInt(index);
            parentThis.snapToItem(index, true); 
            parentThis.setState({ activeSlide: index });
        }
        for (let i = 0; i < dotsLength; i++) {
            dots.push(
                <TouchableOpacity key={i} onPress={() => onPressFunction(i)}> 
                <PaginationDot
                  key={`pagination-dot-${i}`}
                  active={i === activeDotIndex}
                  style={dotStyle}
                  inactiveOpacity={inactiveDotOpacity}
                  inactiveScale={inactiveDotScale}
                  dotColor={colorsArray !== undefined ? colorsArray[i] : '#356CB1'}
                />
                </TouchableOpacity>
            );
        }

        return dots;
    }

    render () {
        const { dotsLength, containerStyle } = this.props;

        if (!dotsLength || dotsLength < 2) {
            return false;
        }

        return (
            <View>
            <ScrollView
            horizontal={true}
              pointerEvents={'none'}
              contentContainerStyle={[styles.sliderPagination, containerStyle || {}]}
            >
                { this.dots }
            </ScrollView>
            </View>
        );
    }
}
