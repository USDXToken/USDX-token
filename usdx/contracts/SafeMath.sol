pragma solidity ^0.4.17;


contract SafeMath {

    function SafeMath()
    public
    {

    }

    function safeAdd(uint256 _x, uint256 _y)
    internal
    pure
    returns (uint256)
    {
        uint256 z = _x + _y;
        require(z >= _x);
        return z;
    }

    function safeSub(uint256 _x, uint256 _y)
    internal
    pure
    returns (uint256)
    {
        require(_x >= _y);
        return _x - _y;
    }

    function safeMul(uint256 _x, uint256 _y)
    internal
    pure
    returns (uint256)
    {
        uint256 z = _x * _y;
        require(_x == 0 || z / _x == _y);
        return z;
    }

}
