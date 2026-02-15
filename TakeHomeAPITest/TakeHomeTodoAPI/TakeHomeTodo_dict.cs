using System.Collections.Concurrent;
using TakeHomeTodoAPI.Item;

namespace TakeHomeTodoAPI.Dict;

public class THTA_Dict : ITHTA_Dict
{
    private readonly ConcurrentDictionary<Guid, THTA_item> _items = new();

    public IEnumerable<THTA_item> GetAll() => _items.Values;

    public THTA_item Add(string itemDesc)
    {
        var item = new THTA_item(Guid.NewGuid(), itemDesc);
        _items[item.itemID] = item;
        return item;
    }

    public bool Delete(Guid itemID)
    {
        return _items.TryRemove(itemID, out _);
    }
}